class PlayersController < ApplicationController
  def create
    @player = Player.new(player_params);
    
    if @player.save
      add_pieces(@player)
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
    Player.find_by_id(params[:id]).delete
    render :json => {:message => "success"}
  end

  private

  def player_params
    params.require(:player).permit(:game_id).merge(name: params[:player_name], color: params[:player_color])
  end

  def add_pieces(player)
    (1..4).each do |i|
      Piece.create(piece_number: i, board_location: i, player_id: player.id)
    end
  end
end