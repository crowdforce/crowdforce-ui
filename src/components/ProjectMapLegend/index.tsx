import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import {
    useCallback, useState, useRef,
} from 'react';

import SaveIcon from '@mui/icons-material/Save';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import CancelIcon from '@mui/icons-material/Cancel';
import { ActionIcon, Group, Stack, Text } from '@mantine/core';

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

const ProjectMapLegend: React.FC<any> = ({ geojsonList, setGeojsonList }) => {
    const [state, setState] = useState(null);
    const ref = useRef(null);

    // @ts-ignore
    const onEdit = useCallback((id) => {
        // @ts-ignore
        const newGeojson = geojsonList.map((x, i) => (x.id == id ? { ...x, name: ref.current?.value } : x));
        setGeojsonList(newGeojson);
        setState(null);
    }, [geojsonList]);

    return (
        <Stack>
            {/* @ts-ignore */}
            {geojsonList.map((x, i) => (
                <Group
                    // direction="row"
                    // spacing={2}
                    // alignItems="center"
                    // flexWrap="nowrap"
                    sx={{
                        height: 44,
                    }}
                >
                    {/* @ts-ignore */}
                    {icons[x.geometryType]}
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
                                        placeholder={x.title}
                                    />
                                    <Divider orientation="vertical" />
                                    <ActionIcon
                                        sx={{
                                            marginLeft: 'auto',
                                        }}
                                        onClick={() => onEdit(x.id)}
                                    >
                                        <SaveIcon />
                                    </ActionIcon>
                                </Paper>
                            </>
                        ) : (
                            <Text>
                                {x.title}
                            </Text>
                        )}
                    </div>
                    {state != null ? (
                        state == i && (
                            <ActionIcon
                                sx={{
                                    marginLeft: 'auto',
                                }}
                                onClick={() => setState(null)}
                            >
                                <CancelIcon />
                            </ActionIcon>
                        )
                    ) : (
                        <ActionIcon
                            sx={{
                                marginLeft: 'auto',
                            }}
                            onClick={() => setState(i)}
                        >
                            <EditIcon />
                        </ActionIcon>
                    )}
                </Group>
            ))}
        </Stack>
    );
};

export default ProjectMapLegend;
