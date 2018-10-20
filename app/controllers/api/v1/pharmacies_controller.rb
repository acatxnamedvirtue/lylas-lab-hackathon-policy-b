class Api::V1::PharmaciesController < ApplicationController
  before_action :set_zip_code, only: [:index]

  def index
    client = YelpAdapter.new
    pharmacies = client.get_pharmacies(@zip_code)
    render json: pharmacies
  end

  def map
    render json: {map_key: ENV['maps_api_key']}
  end
end

