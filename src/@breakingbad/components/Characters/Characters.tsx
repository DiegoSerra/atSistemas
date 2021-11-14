import { selectCharacters } from "@breakingbad/context/characters";
import { CharacterType } from "@breakingbad/types/Character.type";
import { useSelector } from "@breakingbad/utils/Context";
import { RootState } from "@breakingbad/utils/Context/Context";
import { t } from "@breakingbad/utils/Internationalization";
import BreakingBadUtils from "@breakingbad/utils/utils";
import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import CharacterItem from "./CharacterItem";

const Characters = () => {
  const characters = useSelector(selectCharacters);
  const searchText = useSelector<RootState>(({ characters }) => characters.searchText) as string;
  const [data, setData] = useState(characters);

  useEffect(() => {
		if (searchText) {
			setData(BreakingBadUtils.filterArrayByString(characters, searchText));
		} else {
			setData(characters);
		}
	}, [characters, searchText]);

  return (
		data?.length ? (
      <div className="flex flex-wrap py-24">
        {data.map((character: CharacterType) => 
          <CharacterItem key={character.char_id} character={character} />
        )}
      </div>
    ) : (
      <div className="flex flex-1 items-center justify-center">
        <Typography color="textSecondary" className="text-24 my-24">
          {t('characters.not_found')}
        </Typography>
      </div>
    )
  );
}

export default Characters;
