import { Stack, Typography } from '@mui/material';
import { getType } from '@turf/invariant';
import { featureReduce } from '@turf/meta';

const items = {
  Point: (
    <div
      style={{
        width: 25,
        height: 25,
        borderRadius: '50%',
        background: '#4E3FC8',
        border: 'solid 3px black',
      }}
    />
  ),
  Polygon: (
    <div
      style={{
        width: 25,
        height: 25,
        background: '#4E3FC8',
        opacity: 0.52,
        border: 'solid 1px black',
        transform: 'skew(0deg, 15deg)',
      }}
    />
  ),
};

const ProjectMapLegend = ({ data }) => {
  const dataFeatureTypes = featureReduce(data, (acc, x, i) => (acc.includes(getType(x)) ? acc : acc.concat(getType(x))), []);

  return (
    <Stack spacing={2}>
      {dataFeatureTypes.map((x, i) => (
        <Stack direction="row" spacing={2}>
          {items[x]}
          <div>
            <Typography>
              {x}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
};

export default ProjectMapLegend;
