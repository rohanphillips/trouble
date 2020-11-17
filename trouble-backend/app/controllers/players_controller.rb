class PlayersController < ApplicationController
  def index
    @players = Player.all
    render json: PlayerSerializer.new(@players)
  end

  def create
    @player = Player.new(player_params);
    if @player.save
      add_pieces(@player, params[:game_id])
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

  def add_pieces(player, game_id)
    player_count = game_player_count(game_id) - 1
    (0..3).each do |i|
      location = "p" + player_count.to_s + "start" + i.to_s
      Piece.create(piece_number: i, board_location: location, player_id: player.id)
    end
  end

  def game_player_count(game_id)
    return Game.find_by_id(game_id).players.count
  end

end