"use strict";

import { create, Flex } from "smbls";

import designSystem from "./designSystem";
import * as components from "./components";
import pages from "./pages";

create(
  {
    extend: Flex,

    props: {
      theme: "document",
      flow: "column",
      minHeight: "100vh",
      align: "center center",
    },
    content: {},
  },
  {
    designSystem,
    components,
    pages,
  }
);
