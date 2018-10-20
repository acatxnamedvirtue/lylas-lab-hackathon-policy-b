class YelpAdapter
  attr_reader :headers, :base_url

  def initialize
    @base_url = 'https://api.yelp.com/v3/businesses/search'
    @headers = "Bearer #{ENV['yelp_api_key']}"
  end


  def get_pharmacies(zip_code)
    params = {
      term: 'pharmacy',
      location: zip_code,
      limit: 20
    }

    resp = RestClient.get(base_url, {Authorization: headers, params: params})
    JSON.parse(resp)['businesses']
  end
end
