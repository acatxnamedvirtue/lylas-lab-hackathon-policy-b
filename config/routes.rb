Rails.application.routes.draw do
  get 'home/index'
  get 'home/timestamp'

  root 'home#index'
  namespace :api do
    namespace :v1 do
      resources :pharmacies, only: [:index]
      resources :plans, only: [:index]
      get '/map', to: 'pharmacies#map'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
