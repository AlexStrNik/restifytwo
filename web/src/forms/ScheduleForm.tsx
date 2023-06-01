import dayjs from "dayjs";
import {
  Button,
  Group,
  Input,
  Select,
  SelectItem,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { IconTrashX } from "@tabler/icons-react";

type ScheduleItem = {
  day_of_week: string | null;
  opens_at: string | null;
  closes_at: string | null;
};

const DAY_OF_WEEKS = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 0,
};

const TIMES: SelectItem[] = [...Array(24).keys()].map((i) => ({
  label: dayjs().startOf("day").add(i, "hour").format("HH:mm"),
  value: i.toString(),
}));

interface ScheduleItemProps extends ScheduleItem {
  index: number;
  schedules: ScheduleItem[];
  editSchedule(item: ScheduleItem & { index: number }): void;
  removeSchedule(index: number): void;
}

const ScheduleItem: React.FC<ScheduleItemProps> = (props) => {
  const theme = useMantineTheme();

  const filledDays = props.schedules.map((item) => item.day_of_week);

  const onChange = (event: Partial<ScheduleItem>) => {
    const newValue = {
      ...props,
      ...event,
    };

    props.editSchedule({
      ...newValue,
      index: props.index,
    });
  };

  return (
    <Group noWrap align="end">
      <Select
        label="Day of week"
        value={props.day_of_week}
        onChange={(value) => onChange({ day_of_week: value })}
        data={Object.entries(DAY_OF_WEEKS).map(([label, value]) => ({
          label,
          value: value.toString(),
          disabled: filledDays.includes(value.toString()),
        }))}
      />

      <Select
        onChange={(value) => onChange({ opens_at: value })}
        value={props.opens_at}
        label="Opens at"
        data={TIMES.map((item) => ({
          ...item,
          disabled:
            props.closes_at != null &&
            Number.parseInt(item.value) >= Number.parseInt(props.closes_at),
        }))}
      />

      <Select
        onChange={(value) => onChange({ closes_at: value })}
        value={props.closes_at}
        label="Closes at"
        data={TIMES.map((item) => ({
          ...item,
          disabled:
            props.opens_at != null &&
            Number.parseInt(item.value) <= Number.parseInt(props.opens_at),
        }))}
      />

      <Button
        onClick={() => props.removeSchedule(props.index)}
        display="inline"
        variant="outline"
        color={theme.primaryColor}
      >
        <IconTrashX size="1rem" />
      </Button>
    </Group>
  );
};

export interface PartialSchedule {
  day_of_week: number | null;
  opens_at: number | null;
  closes_at: number | null;
}

interface ScheduleFormProps {
  value: PartialSchedule[];
  onChange(value: PartialSchedule[]): void;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ value, onChange }) => {
  const schedules: ScheduleItem[] = value.map((schedule) => ({
    day_of_week:
      schedule.day_of_week != null ? schedule.day_of_week.toString() : null,
    opens_at: schedule.opens_at != null ? schedule.opens_at.toString() : null,
    closes_at:
      schedule.closes_at != null ? schedule.closes_at.toString() : null,
  }));

  const _onChange = (schedules: ScheduleItem[]) => {
    onChange(
      schedules.map((schedule) => ({
        day_of_week:
          schedule.day_of_week != null
            ? Number.parseInt(schedule.day_of_week)
            : null,
        opens_at:
          schedule.opens_at != null ? Number.parseInt(schedule.opens_at) : null,
        closes_at:
          schedule.closes_at != null
            ? Number.parseInt(schedule.closes_at)
            : null,
      }))
    );
  };

  return (
    <Input.Wrapper>
      <Stack>
        {schedules.map((schedule, index) => (
          <ScheduleItem
            key={`schedule-${schedule.day_of_week}-${index}`}
            {...schedule}
            index={index}
            schedules={schedules}
            editSchedule={(event) => {
              const schedulesCopy = [...schedules];
              schedulesCopy[event.index] = event;

              _onChange(schedulesCopy);
            }}
            removeSchedule={(index) => {
              _onChange(schedules.filter((_, i) => i != index));
            }}
          />
        ))}
      </Stack>
      <Button
        mt="xs"
        onClick={() =>
          _onChange([
            ...schedules,
            {
              day_of_week: null,
              opens_at: null,
              closes_at: null,
            },
          ])
        }
      >
        Add schedule
      </Button>
    </Input.Wrapper>
  );
};

export default ScheduleForm;
