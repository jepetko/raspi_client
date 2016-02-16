Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'ui#index'
  get 'ui/(:action)', controller: 'ui'

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'

end
