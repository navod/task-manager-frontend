import {
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  NumberedListIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";

export const taskStatus = [
  {
    title: "All",
    type: "All",
    icon: NumberedListIcon,
  },
  {
    title: "Todo",
    type: "TODO",
    icon: ArrowTrendingUpIcon,
  },
  {
    title: "Pending",
    type: "PENDING",
    icon: ClipboardDocumentIcon,
  },
  {
    title: "Done",
    type: "DONE",
    icon: CheckCircleIcon,
  },
];
