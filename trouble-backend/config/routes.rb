Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :games, only:[:index, :create, :show, :destroy, :edit]
  resources :players, only:[:create, :show, :destroy, :edit]
  resources :pieces, only:[:show, :edit]
end
