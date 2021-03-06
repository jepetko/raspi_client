require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RaspiClient
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.encoding = 'utf-8'
    config.filter_parameters += [:password]
    config.active_support.escape_html_entities_in_json = true

    #config.assets.enabled = true
    config.generators do |g|
      g.orm :active_record
      g.template_engine :haml
    end

    config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components', 'bootstrap-sass-official', 'assets', 'fonts')
    config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')

    config.assets.precompile << %r(.*\.(?:eot|svg|ttf|woff|woff2)$)
  end
end
