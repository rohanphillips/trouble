class PlayerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :color, :pieces
end
