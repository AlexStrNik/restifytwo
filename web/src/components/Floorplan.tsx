// @ts-nocheck
import {
  createStyles,
  rem,
  MantineTheme,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useRef, memo } from "react";

interface FloorplanProps {
  floorId: string;
  publishableToken: string;
  tableChanged?: (string) => void;
}

const makeTheme = (theme: MantineTheme) => ({
  background: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
  },
  elements: {
    roomStamp: {
      showUsage: false,
      showArea: false,
    },
    wall: {
      fill: toRGBArray(theme.fn.variant({ variant: "default" }).border!),
      stroke: toRGBArray(theme.fn.variant({ variant: "default" }).border!),
    },
    asset: {
      fill: toRGBArray(
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2]
      ),
      stroke: toRGBArray(
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[5]
      ),
    },
    kitchen: {
      fill: toRGBArray(
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
      ),
      stroke: toRGBArray(
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[3]
      ),
    },
    door: {
      fill: toRGBArray(theme.fn.variant({ variant: "default" }).border!),
      stroke: toRGBArray(theme.fn.variant({ variant: "default" }).border!),
    },
    window: {
      fill: toRGBArray(theme.fn.variant({ variant: "default" }).border!),
      stroke: toRGBArray(theme.fn.variant({ variant: "default" }).border!),
    },
    curtain: {
      fill: toRGBArray(theme.fn.variant({ variant: "default" }).border!),
      stroke: toRGBArray(theme.fn.variant({ variant: "default" }).border!),
    },
    space: {
      fill: toRGBArray(
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      ),
    },
  },
});

const useStyles = createStyles((theme) => ({
  wrapper: {
    borderRadius: theme.fn.radius(theme.defaultRadius),
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    overflow: "hidden",
  },
}));

const toRGBArray = (hex: string) =>
  hex.length == 4
    ? [
        parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16),
        parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16),
        parseInt(hex.substring(3, 4) + hex.substring(3, 4), 16),
      ]
    : [
        parseInt(hex.substring(1, 3), 16),
        parseInt(hex.substring(3, 5), 16),
        parseInt(hex.substring(5, 7), 16),
      ];

const Floorplan: React.FC<FloorplanProps> = ({
  floorId,
  publishableToken,
  tableChanged,
}) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const ref = useRef(null);
  const selectedTable = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const floorPlan = new FloorPlanEngine(ref.current, {
      theme: makeTheme(theme),
      ui: {
        menu: false,
        scale: false,
        coordinates: false,
      },
    });
    floorPlan.loadScene(floorId, { publishableToken }).then(() => {
      floorPlan.resources.spaces.forEach((space) => {
        space.assets.forEach((id) => {
          let asset = floorPlan.resources.assets.find((f) => f.id === id);

          if (!asset.categories.includes("tables")) return;

          asset.node.setHighlight({
            fill: toRGBArray(theme.fn.variant({ variant: "default" }).border!),
          });
        });
      });

      if (tableChanged !== null) {
        floorPlan.on("click", ({ pos }) => {
          let { assets } = floorPlan.getResourcesFromPosition(pos);

          for (let asset of assets) {
            if (!asset.categories.includes("tables")) continue;

            if (selectedTable.current) {
              selectedTable.current.setHighlight({
                fill: toRGBArray(
                  theme.fn.variant({ variant: "default" }).border!
                ),
              });
            }

            asset.node.setHighlight({
              fill: toRGBArray(
                theme.fn.variant({ variant: "default" }).border!
              ),
              outline: toRGBArray(theme.fn.themeColor(theme.primaryColor)),
              outlineWidth: 2,
            });
            floorPlan.zoomToElement(asset.node, 2, 250);
            selectedTable.current = asset.node;

            tableChanged(asset.id);

            return;
          }
        });
      }
    });
  }, [ref.current, theme]);

  return <div className={classes.wrapper} ref={ref}></div>;
};

export default memo(Floorplan);
