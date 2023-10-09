namespace Pipmon
{
    public class WorldCoordinate
    {
        public WorldCoordinate(int x, int y, string type)
        {
            X = x;
            Y = y;
            Type = type;
        }

        public int X { get; set; }
        public int Y { get; set; }
        public string Type { get; set; }
    }
}