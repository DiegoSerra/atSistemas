import { CardSectionDataType, CardSectionProps } from '@breakingbad/types/CardSection.type';
import { Card, CardContent, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import { memo } from 'react';

const CardSection = ({
  name,
  className,
  title,
  data,
  defaultValue = '-',
  children
}: CardSectionProps) => {
  const CardSectionClass = classNames('w-full my-32 rounded-16 shadow text-left', !!name && `${name}__section`, className);

  const CardSectionItemJSX = (item: CardSectionDataType, index: number) => {
    return (
      <div key={index} className="mb-24">
        <Typography className="font-semibold mb-4 text-15">{item.label}</Typography>
        {item.value !== null && item.value !== undefined ? (
          <Typography>{item.value}</Typography>
        ) : !!item?.component ? (
          item?.component
        ) : (
          <Typography>{defaultValue}</Typography>
        )}
      </div>
    );
  };
  
	return (
    <Card className={CardSectionClass}>
      {title && <AppBar position="static" elevation={0}>
        <Toolbar className="px-8">
          <Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>}

      {data && <CardContent>
        {data.map((item: any, index: number) =>
          CardSectionItemJSX(item, index)
      )}
      {children}
      </CardContent>}
    </Card>
	);
}

export default memo(CardSection);