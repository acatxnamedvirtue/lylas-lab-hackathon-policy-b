class VericredAdapter
  attr_reader :headers, :base_url

  def initialize
    @base_url = 'https://api.vericred.com/'
    @headers = {
      'Content-Type' => 'application/json',
      'Vericred-Api-Key' => ENV['vericred_api_key']
    }
  end

  def get_plans(state)
    drug_ids = ENV['drug_ids'].split(', ').shuffle.first(2)
    coverages = drug_ids.map{|drug_id| get_coverages(drug_id, state)}.flatten.shuffle.first(10)
    plans = coverages.map{|coverage| get_plan(coverage)}
    plans.compact
  end

  def get_coverages(drug_id, state)
    url = base_url + "drug_packages/#{drug_id}/coverages?audience=individual&state_code=#{state}"
    resp = RestClient.get(url, headers)
    JSON.parse(resp)['drug_coverages']
  end

  def get_plan(coverage)
    year = DateTime.now.year
    url = base_url + "plans/medical/#{coverage['plan_id']}?year=#{year}"
    resp = RestClient.get(url, headers){|response, request, result| response }
    plan = JSON.parse(resp)['plan']
    format_plan(plan, coverage['tier'])
  end

  def format_plan(plan, tier)
    if plan
      {
        id: plan['id'],
        name: "#{plan['carrier_name']}: #{plan['display_name']}",
        medal: plan['level'],
        ec: drug_covered(tier),
        cost: drug_cost(plan, tier),
        pre: plan['premium'] || 'contact for rates'
      }
    else
      nil
    end
  end

  def drug_covered(tier)
    case tier
    when "preferred_brand", "non_preferred_brand"
      "covered"
    when "not_covered"
      "not covered"
    else
      "not listed"
    end
  end

  def drug_cost(plan, tier)
    case tier
    when "preferred_brand", "non_preferred_brand"
      plan["#{tier}_drugs"]
    else
      "-"
    end
  end

  # dynamically searches for drug ids

  # def get_drug_ids
  #   # searches for plan-b and generic version
  #   drug_search('plan+b') + drug_search('Levonorgestrel')
  # end
  #
  # def drug_search(term)
  #   url = base_url + "drugs?search_term=#{term}"
  #   resp = RestClient.get(url, headers)
  #   data = JSON.parse(resp)
  #   # returns an array of drug package id numbers
  #   data['drugs'].map{|drug| drug['drug_package_ids']}.flatten
  # end
end
