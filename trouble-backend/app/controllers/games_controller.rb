class GamesController < ApplicationController
  def index
  end

  def create

  end

  def update
    @game = Game.find(params[:id])
    if @game.valid?
      @game.update(params)
      redirect_to game_url
    else 
      render :json => {:error => "game not updated", :messages => @game.errors}
    end
  end

  def show
    game = Game.find(params[:id])
    render json: GameSerializer.new(game)
  end

  def destroy

  end
end