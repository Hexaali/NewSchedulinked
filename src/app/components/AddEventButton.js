import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
  Select as MTSelect,
  Option,
} from "@material-tailwind/react";
import {
  CalendarDaysIcon,
  ClockIcon,
  LinkIcon,
  PhotoIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { API_BASE_URL } from "@/constants";

const animatedComponents = makeAnimated();

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#f9fafb",
    borderColor: state.isFocused ? "#22c55e" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(34,197,94,0.4)" : "none",
    borderRadius: "0.5rem",
    minHeight: "2.75rem",
    fontSize: "0.875rem",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "#22c55e",
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#dcfce7",
    borderRadius: "0.375rem",
    padding: "0 0.25rem",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#065f46",
    fontWeight: 500,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#065f46",
    ":hover": {
      backgroundColor: "#bbf7d0",
      color: "#064e3b",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.5rem",
    zIndex: 20,
  }),
};

export default function AddEventButton({ onNewEvent }) {
  const [open, setOpen] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [selectedFollowers, setSelectedFollowers] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.followers?.length > 0) {
      const formatted = userData.followers.map((f) => ({
        value: f.username,
        label: `${f.first_name} ${f.last_name}`,
      }));
      setFollowers(formatted);
    }
  }, []);

  const formatUrl = (url) => {
    if (!url) return "";
    if (!/^https?:\/\//i.test(url)) {
      return "https://" + url;
    }
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawForm = new FormData(e.target);
    const token = localStorage.getItem("token");

    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : null;

    if (end && end <= start) {
      alert("End time must be after start time.");
      return;
    }

    const formattedStart = start.toISOString().replace("T", " ").slice(0, 19);
    const externalUrl = formatUrl(rawForm.get("link"));

    const jsonData = {
      title: rawForm.get("title"),
      time: formattedStart,
      location: rawForm.get("location") || "Online",
      external_url: externalUrl,
      description: rawForm.get("description"),
      category: rawForm.get("category")?.toUpperCase() || "EVENT",
      followers: selectedFollowers.map((f) => f.value),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(jsonData),
      });

      if (!res.ok) throw new Error("Failed to create event");
      const result = await res.json();

      if (typeof onNewEvent === "function") {
        onNewEvent(result);
      }

      setOpen(false);
      setStartTime("");
      setEndTime("");
      setSelectedFollowers([]);
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Event creation failed. Please try again.");
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="bg-gradient-to-tr from-green-500 to-yellow-400 text-black text-lg font-extrabold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform"
      >
        ➕ Add Event
      </Button>

      <Dialog open={open} handler={handleOpen} size="md" className="bg-white rounded-xl shadow-2xl max-w-[95vw] mx-auto overflow-hidden sm:max-w-lg md:max-w-xl">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <DialogHeader className="bg-gradient-to-br from-yellow-400 to-green-500 rounded-t-xl px-4 py-3">
            <Typography variant="h4" className="text-black font-extrabold text-lg">
              🎤 New Artist Event
            </Typography>
          </DialogHeader>

          <DialogBody className="space-y-4 px-4 py-3 overflow-y-auto flex-1 max-h-[65vh]">
            <Input variant="standard" name="title" label="Event Title" required color="green" icon={<CalendarDaysIcon className="h-5 w-5 text-green-700" />} />
            <Input name="datetime" label="Start Time" type="datetime-local" required color="green" icon={<ClockIcon className="h-5 w-5 text-green-700" />} value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <Input name="endtime" label="End Time (optional)" type="datetime-local" color="green" icon={<ClockIcon className="h-5 w-5 text-green-700" />} value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <Input variant="standard" name="location" label="Location (URL or Online)" placeholder="e.g. Online or https://..." color="green" />
            <Textarea name="description" label="Description" required color="green" rows={4} className="resize-none" />

            {followers.length > 0 && (
              <div>
                <Typography className="text-sm text-gray-700 font-medium mb-1">
                  Tag Followers
                </Typography>
                <Select
                  isMulti
                  options={followers}
                  value={selectedFollowers}
                  onChange={setSelectedFollowers}
                  components={animatedComponents}
                  placeholder="Select followers by name..."
                  styles={customSelectStyles}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
            )}

            <Input name="image" type="file" accept="image/*" color="green" icon={<PhotoIcon className="h-5 w-5 text-green-700" />} />
            <Input name="link" label="External URL" type="text" color="green" icon={<LinkIcon className="h-5 w-5 text-green-700" />} />

            <div>
              <Typography className="text-sm text-gray-700 font-medium">Category</Typography>
              <MTSelect name="category" color="green" required label="Select a category">
                <Option value="event">Event</Option>
                <Option value="drop">Drop</Option>
                <Option value="merch">Merchandise</Option>
                <Option value="tour">Tour</Option>
                <Option value="video">Video</Option>
                <Option value="reminder">Reminder</Option>
              </MTSelect>
            </div>

            <div>
              <Typography className="text-sm text-gray-700 font-medium">Attachment</Typography>
              <Input name="attachment" type="file" color="green" icon={<PaperClipIcon className="h-5 w-5 text-green-700" />} />
            </div>
          </DialogBody>

          <DialogFooter className="flex justify-end gap-3 p-3 border-t">
            <Button variant="text" color="red" onClick={handleOpen}>Cancel</Button>
            <Button type="submit" color="green" className="font-bold bg-gradient-to-br from-yellow-400 to-green-500">Create Event</Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
