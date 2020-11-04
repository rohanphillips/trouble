class PlayersController < ApplicationController
  def create

  end

  def edit

  end

  def show
    player = Player.find(params[:id])
    render json: PlayerSerializer.new(player)
  end

  def destroy

  end
end