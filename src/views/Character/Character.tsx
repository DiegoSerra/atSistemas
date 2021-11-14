import Loading from "@breakingbad/components/Loading";
import { CharacterContext, getCharacter, getRandomQuote } from "@breakingbad/context/character";
import { useDispatch, useSelector } from "@breakingbad/utils/Context";
import { RootState } from "@breakingbad/utils/Context/Context";
import { t } from "@breakingbad/utils/Internationalization";
import { AppBar, Card, CardContent, CardMedia, Icon, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

export default function Character() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { value: character, quote } = useSelector<RootState>(({ character }) => character) as CharacterContext;
  const [loading, setLoading] = useState(true);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getCharacter(+id))
      .unwrap()
      .then((response) => dispatch(getRandomQuote(response.name)))
      .then(() => setLoading(false))
      .catch(() => history.replace('/not-found'))
  }, [dispatch, history, id]);

  if (loading || !character) {
		return <Loading />;
	}

  return (
    <div className="flex py-24">
      <div className="w-full md:w-1/2 md:p-16">
        <div className="flex-auto flex-wrap content-center justify-center align-center">
          <IconButton to="/" component={Link} className="mb-20 mr-8">
            <Icon>arrow_back</Icon>
          </IconButton>

          <Typography gutterBottom variant="h2" component="span">
            {character.name}
          </Typography>
        </div>

        {quote && <Paper elevation={3} className="px-32 relative">
          <IconButton className="w-16 h-16 absolute top-8 right-8" onClick={() => dispatch(getRandomQuote(character.name))}>
            <Icon className="text-16">refresh</Icon>
          </IconButton>
          <Typography variant="h5" color="inherit" className="flex-1 py-12 font-medium italic">
            {'"' + quote.quote + '"'}
          </Typography>
          <Typography variant="body2" component="div" className="flex-1 pb-12 text-right">
            - {quote.author}
          </Typography>
        </Paper>}

        <Card className="w-full my-32 rounded-16 shadow text-left">
          <AppBar position="static" elevation={0}>
            <Toolbar className="px-8">
              <Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
              {t('character.information')}
              </Typography>
            </Toolbar>
          </AppBar>

          <CardContent>
            <div className="mb-24">
              <Typography className="font-semibold mb-4 text-15">{t('character.birthday')}</Typography>
              <Typography>{character.birthday}</Typography>
            </div>

            <div className="mb-24">
              <Typography className="font-semibold mb-4 text-15">{t('character.nickname')}</Typography>
              <Typography>{character.nickname}</Typography>
            </div>

            <div className="mb-24">
              <Typography className="font-semibold mb-4 text-15">{t('character.category')}</Typography>
              <Typography>{character.category}</Typography>
            </div>

            <div className="mb-24">
              <Typography className="font-semibold mb-4 text-15">{t('character.portrayed')}</Typography>
              <Typography>{character.portrayed}</Typography>
            </div>

            <div className="mb-24">
              <Typography className="font-semibold mb-4 text-15">{t('character.occupation')}</Typography>

              {character.occupation.map(occupation => (
                <div className="flex items-center" key={occupation}>
                  <Typography>{occupation}</Typography>
                  <Icon className="text-16 mx-4" color="action">
                  business_center
                  </Icon>
                </div>
              ))}
            </div>

            <div className="mb-24">
              <Typography className="font-semibold mb-4 text-15">{t('character.appearance')}</Typography>
              <Typography>{character.appearance.join(', ')}</Typography>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full md:w-1/2 md:p-16">
        <Card className="flex flex-col shadow">
          <CardMedia
            component="img"
            image={character.img}
            alt={character.name}
          />
        </Card>
      </div>
    </div>
  );
}