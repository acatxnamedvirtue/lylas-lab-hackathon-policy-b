class Api::V1::PlansController < ApplicationController
  before_action :set_state, only: [:index]

  def index
    client = VericredAdapter.new
    plans = client.get_plans(@state)
    render json: plans
  end
end

