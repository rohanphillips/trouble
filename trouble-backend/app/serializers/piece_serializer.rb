class PieceSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :board_location
end
