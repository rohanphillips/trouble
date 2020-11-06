class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :complete, :players, :pieces
end
