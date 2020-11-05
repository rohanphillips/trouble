class PlayersController < ApplicationController
  def create
    @player = Player.new(player_params);
    
    if @player.save
      render json: PlayerSerializer.new(@player);
    else
      render :json => {:error => "playerNotCreated", :errors => @player.errors}
    end;
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
    params.require(:player).permit(:game_id).merge(name: params[:player_name], color: params[:player_color])
  end
end