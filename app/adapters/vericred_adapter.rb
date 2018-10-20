class VericredAdapter
  attr_reader :headers, :base_url

  def initialize
    @base_url = 'https://api.vericred.com'
    @headers = {
      'Content-Type' => 'application/json',
      'Vericred-Api-Key' => ENV['vericred_api_key']
    }
  end

  def drug_search
    url = "#{base_url}/drugs?search_term=plan+b"
    resp = RestClient.get(url, headers)
    JSON.parse(resp)
  end
end

