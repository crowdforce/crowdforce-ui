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
import useSWR from 'swr';
import { AdminFeatureDto } from '@/common/types';
import { IconPoint, IconPolygon } from '@tabler/icons';

type GeometryIconProps = {
    type: string
}

const GeometryIcon: React.FC<GeometryIconProps> = ({ type }) => {
    if (type === 'Point') {
        return (
            <IconPoint />
        )
    }

    if (type === 'Polygin') {
        return (
            <IconPolygon />
        )
    }

    return null
}

export type ProjectMapLegendProps = {
    projectId: string
}

const ProjectMapLegend: React.FC<ProjectMapLegendProps> = ({ projectId }) => {
    const [state, setState] = useState<number | null>(null);
    const ref = useRef(null);
    const { data, error } = useSWR<AdminFeatureDto[]>(`/api/admin/projects/${projectId}/features`)

    // @ts-ignore
    const onEdit = useCallback((id) => {
        // @ts-ignore
        const newGeojson = data.map((x, i) => (x.id == id ? { ...x, name: ref.current?.value } : x));
        // setGeojsonList(newGeojson);
        setState(null);
    }, [data]);

    return (
        <Stack>
            {(data ?? []).map((x, i) => (
                <Group
                    key={i}
                    // direction="row"
                    // spacing={2}
                    // alignItems="center"
                    // flexWrap="nowrap"
                    sx={{
                        height: 44,
                    }}
                >
                    <GeometryIcon type={x.geometryType} />
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
