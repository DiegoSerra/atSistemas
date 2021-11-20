import CardSection from "@breakingbad/components/CardSection";
import Loading from "@breakingbad/components/Loading";
import { CharacterContext, getCharacter, getDeath, getRandomQuote, resetCharacter } from "@breakingbad/context/character";
import { useDispatch, useSelector } from "@breakingbad/utils/Context";
import { t } from "@breakingbad/utils/Internationalization";
import { getStatusIcon } from "@breakingbad/utils/utils";
import { Card, CardMedia, Icon, IconButton, Paper, Typography, Link as ButtonLink, Tooltip, LinearProgress, Divider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { RootState } from "store";

export default function Character() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { value: character, quote, death } = useSelector<RootState>(({ character }) => character) as CharacterContext;
  const [loading, setLoading] = useState(true);
  const [showSpoiler, setShowSpoiler] = useState(false);
  const [spoilerLoading, setSpoilerLoading] = useState(false);
  
  const { id } = useParams<{ id: string }>();

  const occupationJSX = (occupation: string[]) => {
    return (
      <>
      {occupation.map(occupation => (
        <div className="flex items-center" key={occupation}>
          <Typography>{occupation}</Typography>
          <Icon className="text-16 mx-4" color="action">
            business_center
          </Icon>
        </div>
      ))}
      </>
    )
  }

  const handleShowSpoiler = async (author: string) => {
    if (!death) {
      setSpoilerLoading(true);
      await dispatch(getDeath(author));
      setSpoilerLoading(false);
    }

    setShowSpoiler(true);
  };

  useEffect(() => {
    dispatch(getCharacter(+id))
      .unwrap()
      .then((response) => dispatch(getRandomQuote(response.name)))
      .finally(() => setLoading(false))
      .catch(() => history.replace('/not-found'))
    
    return () => {
      dispatch(resetCharacter());
      setShowSpoiler(false);
    }
  }, [dispatch, history, id]);

  if (loading || !character) {
		return <Loading />;
	}

  return (
    <div className="flex flex-wrap py-24">
      <div className="w-full md:w-1/2 md:p-16">
        <div className="flex-auto flex-wrap content-center justify-center align-center">
          <IconButton to="/" component={Link} className="mb-8 sm:mb-20 mr-8">
            <Icon>arrow_back</Icon>
          </IconButton>

          <Typography className="text-28 sm:text-56" gutterBottom variant="h2" component="span">
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

        <CardSection
          title={t('character.information')}
          data={[
            { label: t('character.birthday'), value: character.birthday },
            { label: t('character.nickname'), value: character.nickname },
            { label: t('character.portrayed'), value: character.portrayed },
            { label: t('character.occupation'), component: occupationJSX(character.occupation) },
            { label: t('character.appearance'), value: t('character.appears_in', { appearance: character.appearance.join(', ') }) },
          ]}
        />
      </div>

      <div className="w-full md:w-1/2 md:p-16">
        <Card className="flex flex-col shadow">
          <CardMedia
            component="img"
            image={character.img}
            alt={character.name}
          />
          {spoilerLoading && <LinearProgress className="w-full rounded-2" color="secondary" />}
        </Card>

        {!showSpoiler && <ButtonLink
          className="text-white"
          component="button"
          variant="body2"
          onClick={() => handleShowSpoiler(character.name)}
        >
          {t('character.show_spoiler')}
        </ButtonLink>}

        {showSpoiler && <ButtonLink
          className="text-white"
          component="button"
          variant="body2"
          onClick={() => setShowSpoiler(false)}
        >
          {t('character.hide_spoiler')}
        </ButtonLink>}

        {showSpoiler && (death ? 
          <CardSection
            data={[
              { 
                label: t('character.status'), 
                component: <div className="flex items-center">
                  <Typography>{character.status}</Typography>
                  <Tooltip title={character.status}>
                    <Icon className="text-16 mx-4" color="action">
                      {getStatusIcon(character.status)}
                    </Icon>
                  </Tooltip>
                </div> 
              },
              { label: t('character.cause'), value: death.cause },
              { label: t('character.responsible'), value: death.responsible },
              { label: t('character.season'), value: death.season },
              { label: t('character.episode'), value: death.episode },
            ]}
          >
            <Divider />
            <Typography variant="body1" color="inherit" className="flex-1 pt-12 text-center">
              {t('character.last_words')}
            </Typography>
            <Typography variant="h5" color="inherit" className="flex-1 py-12 font-medium italic text-center">
              {death.last_words}
            </Typography>
          </CardSection> :
          <Paper elevation={3} className="py-20 px-32 shadow text-left">
            <Typography variant="h5" color="inherit" className="flex-1 py-12 font-medium italic text-center">
              {t('character.alive')}
              <Tooltip title={character.status}>
                <Icon className="text-16 mx-4" color="action">
                  {getStatusIcon(character.status)}
                </Icon>
              </Tooltip>
            </Typography>
          </Paper>
        )}  
      </div>
    </div>
  );
}