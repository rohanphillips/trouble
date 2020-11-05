class PlayersController < ApplicationController
  def create
    byebug
  end

  def edit

  end

  def show
    player = Player.find(params[:id])
    render json: PlayerSerializer.new(player)
  end

  def destroy

  end

  def player_params
end