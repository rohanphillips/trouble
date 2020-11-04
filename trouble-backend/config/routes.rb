Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :games, only:[:index, :create, :show, :destroy, :update]
  resources :players, only:[:create, :show, :destroy, :update]
  resources :pieces, only:[:show, :update]

  get '/test', to: 'application#test'
end
