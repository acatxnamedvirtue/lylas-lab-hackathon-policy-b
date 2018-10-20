class VericredAdapter
  attr_reader :headers, :base_url

  def initialize
    @base_url = 'https://api.vericred.com/'
    @headers = {
      'Content-Type' => 'application/json',
      'Vericred-Api-Key' => ENV['vericred_api_key']
    }
  end

  def execute
    # get zip code and match state
    drug_ids = get_drug_ids.shuffle.first(10)
    drug_ids.map{|ndc_id| get_coverages(ndc_id, "CA")}.flatten
  end

  def get_coverages(drug_id, state)
    url = base_url + "drug_packages/#{drug_id}/coverages?audience=individual&state_code=#{state}"
    resp = RestClient.get(url, headers)
    data = JSON.parse(resp)
    data["drug_coverages"]
  end

  def get_drug_ids
    drug_search('plan+b') + drug_search('Levonorgestrel')
  end

  def drug_search(term)
    url = base_url + "drugs?search_term=#{term}"
    resp = RestClient.get(url, headers)
    data = JSON.parse(resp)
    drug_ids(data)
  end

  def drug_ids(data)
    data['drugs'].map{|d| d['drug_package_ids']}.flatten
  end
end

# major medical plan show plan
# tier, prior auth

