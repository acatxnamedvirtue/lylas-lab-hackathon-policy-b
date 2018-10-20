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
    pharmacies = JSON.parse(resp)['businesses']
    pharmacies.map{|pharmacy| format_pharmacy(pharmacy)}
  end

  def format_pharmacy(pharmacy)
    {
      id: pharmacy['id'],
      name: pharmacy['name'],
      address: pharmacy['location']['address1'],
      city: pharmacy['location']['city'],
      state: pharmacy['location']['state'],
      zipcode: pharmacy['location']['zip_code'],
      recommended: [true, false].sample,
      numberOfPharmacists: rand(1..5),
      otc: [true, false].sample,
      latitude: pharmacy['coordinates']['latitude'],
      longitude: pharmacy['coordinates']['longitude']
    }
  end




end
