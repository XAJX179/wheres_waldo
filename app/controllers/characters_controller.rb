class CharactersController < ApplicationController
  IMG_HEIGHT = 1365
  IMG_WIDTH = 2048

  def index
    reset_session
    @characters = Character.select(:serial_no, :name).as_json(except: :id)
    render json: @characters
  end

  def update
    if current_game_session
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
        if current_game_session.characters_found.split("").include?(serial_no)
          head :no_content
        else
          current_game_session.characters_found += serial_no
          current_game_session.save

          if current_game_session.characters_found.length == 5
            current_game_session.ended_at = current_game_session.updated_at
            current_game_session.save
            head :reset_content
            return
          end
          render json: @character
        end
      else
        head :no_content
      end
    end
  end
end
