class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

  def set_state
    zip_code = params[:zip_code]
    @state = ZipCodes.identify(zip_code)[:state_code]
  end
end
