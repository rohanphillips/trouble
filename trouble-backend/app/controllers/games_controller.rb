class GamesController < ApplicationController
  def index
  end

  def create

  end

  def edit

  end

  def show
    game = Game.find(params[:id])
    render json: GameSerializer.new(game)
  end

  def destroy

  end
end