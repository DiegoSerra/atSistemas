import { CharacterType } from "@breakingbad/types/Character.type";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

type Props = {
  character: CharacterType
}

const CharacterItem = ({ character }: Props) => {
  return (
		<div className="w-full pb-24 sm:w-1/2 md:w-1/3 xl:w-1/4 sm:p-16">
      <Card className="flex flex-col h-296 shadow">
        <CardActionArea component={Link} to={`/characters/${character.char_id}`}>
          <CardMedia
            className="h-256 object-top"
            component="img"
            image={character.img}
            alt={character.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {character.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default CharacterItem;
