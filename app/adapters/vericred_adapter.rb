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
    drug_ids = ENV['drug_ids'].split(", ").first(10)
    coverages = drug_ids.map{|drug_id| get_coverages(drug_id, state)}.flatten.first(10)
    coverages.map{|coverage| get_plan(coverage["plan_id"])}
  end

  def get_coverages(drug_id, state)
    url = base_url + "drug_packages/#{drug_id}/coverages?audience=individual&state_code=#{state}"
    resp = RestClient.get(url, headers)
    data = JSON.parse(resp)
    data["drug_coverages"]
  end

  def get_plan(plan_id)
    year = DateTime.now.year
    url = base_url + "plans/medical/#{plan_id}?year=#{year}"
    resp = RestClient.get(url, headers){|response, request, result| response }
    plan = JSON.parse(resp)['plan']
    format_plan(plan)
  end

  def format_plan(plan)
    plan.slice(
      "carrier_name",
      "display_name",
      "plan_type",
      "family_drug_deductible",
      "individual_drug_deductible",
      "generic_drugs",
      "id",
      "non_preferred_brand_drugs",
      "preferred_brand_drugs",
      "specialty_drugs",
      "nonpreferred_generic_drug_share",
      "nonpreferred_specialty_drug_share"
    )
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
