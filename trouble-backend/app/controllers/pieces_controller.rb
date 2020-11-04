class PiecesController < ApplicationController
  def edit

  end
  
  def show
    piece = Piece.find(params[:id])
    render json: PieceSerializer.new(piece)
  end
end