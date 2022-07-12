import { Stack, Typography } from '@mui/material';
import { getType } from '@turf/invariant';
import { featureReduce, propEach, propReduce } from '@turf/meta';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import {
  useCallback, useContext, useState, useRef,
} from 'react';

import SaveIcon from '@mui/icons-material/Save';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import CancelIcon from '@mui/icons-material/Cancel';

const icons = {
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

const ProjectMapLegend = ({ geojsonList, setGeojsonList }) => {
  const [state, setState] = useState(null);
  const ref = useRef(null);

  const onEdit = useCallback((id) => {
    const newGeojson = geojsonList.map((x, i) => (x.id == id ? { ...x, name: ref.current?.value } : x));
    setGeojsonList(newGeojson);
    setState(null);
  }, [geojsonList]);

  return (
    <Stack spacing={2}>
      {geojsonList.map((x, i) => (
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          flexWrap="nowrap"
          sx={{
            height: 44,
          }}
        >
          {icons[x.type]}
          <div
            style={{
              flex: 1,
            }}
          >
            {state == i ? (
              <>
                <Paper
                  sx={{
                    p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 400,
                  }}
                >
                  <InputBase
                    inputRef={ref}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={x.name}
                  />
                  <Divider orientation="vertical" />
                  <IconButton
                    xs={{
                      marginLeft: 'auto',
                    }}
                    onClick={() => onEdit(x.id)}
                  >
                    <SaveIcon />
                  </IconButton>
                </Paper>
              </>
            ) : (
              <Typography>
                {x.name}
              </Typography>
            )}
          </div>
          {state != null ? (
            state == i && (
              <IconButton
                xs={{
                  marginLeft: 'auto',
                }}
                onClick={() => setState(null)}
              >
                <CancelIcon />
              </IconButton>
            )
          ) : (
            <IconButton
              xs={{
                flex: '1 0 auto',
              }}
              onClick={() => setState(i)}
            >
              <EditIcon />
            </IconButton>
          )}
        </Stack>
      ))}
    </Stack>
  );
};

export default ProjectMapLegend;
