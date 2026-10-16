class CharactersController < ApplicationController
  IMG_HEIGHT = 1365
  IMG_WIDTH = 2048

  def index
    @characters = Character.select(:serial_no, :name, :x, :y, :x_expand, :y_expand).as_json(except: :id)
    render json: @characters
  end

  def update
    guess_x = (params[:x].to_f / IMG_WIDTH * 100).truncate(2)
    guess_y = (params[:y].to_f / IMG_HEIGHT * 100).truncate(2)
    serial_no = params[:id]
    @character = Character.find_by(serial_no: serial_no)
    pp guess_x, guess_y
    pp @character
    pp x = @character.x.to_f
    pp y = @character.y.to_f
    pp x_expand = @character.x_expand
    pp y_expand = @character.y_expand

    x_correct =  guess_x.between?(x - x_expand, x + x_expand)
    y_correct =  guess_y.between?(y - y_expand, y + y_expand)

    if x_correct && y_correct
      render json: @character
    else
      head :no_content
    end
  end
end
