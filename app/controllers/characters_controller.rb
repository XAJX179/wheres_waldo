class CharactersController < ApplicationController
  def index
    @characters = Character.select(:serial_no, :name, :x, :y, :x_expand, :y_expand).as_json(except: :id)
    render json: @characters
  end
end
