import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import {
  CalendarDaysIcon,
  ClockIcon,
  LinkIcon,
  PhotoIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";

export default function AddEventButton({ onNewEvent }) {
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState("00:00:00");

  const handleOpen = () => setOpen(!open);

  const formatDuration = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 6);
    let hh = digits.slice(0, 2);
    let mm = digits.slice(2, 4);
    let ss = digits.slice(4, 6);

    if (hh && parseInt(hh) > 23) hh = "23";
    if (mm && parseInt(mm) > 59) mm = "59";
    if (ss && parseInt(ss) > 59) ss = "59";

    let formatted = hh;
    if (mm) formatted += ":" + mm;
    if (ss) formatted += ":" + ss;

    return formatted;
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    const formatted = formatDuration(value);
    setDuration(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawForm = new FormData(e.target);

    const token = localStorage.getItem("token");

    const datetime = new Date(rawForm.get("datetime"));
    const formattedTime = datetime.toISOString().replace("T", " ").slice(0, 19);
    const formattedDuration = `0 ${duration}`;
    const externalUrl = formatUrl(rawForm.get("link"));

    const jsonData = {
      title: rawForm.get("title"),
      time: formattedTime,
      duration: formattedDuration,
      location: rawForm.get("location") || "Online",
      external_url: externalUrl,
      description: rawForm.get("description"),
      category: rawForm.get("category")?.toUpperCase() || "EVENT",
    };

    console.log("Sending JSON Data:", jsonData);

    try {
      const res = await fetch("https://schedulinked.kayman.biz/api/v1/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(jsonData),
      });

      if (!res.ok) throw new Error("Failed to create event");

      const result = await res.json();
      console.log("Event Created:", result);

      if (typeof onNewEvent === "function") {
        onNewEvent(result);
      }

      setOpen(false);
      setDuration("00:00:00");
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Event creation failed. Please try again.");
    }
  };

  const formatUrl = (url) => {
    if (!url) return "";
    if (!/^https?:\/\//i.test(url)) {
      return "https://" + url;
    }
    return url;
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="bg-gradient-to-tr from-green-500 to-yellow-400 text-black text-lg font-extrabold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform"
      >
        ➕ Add Event
      </Button>

      <Dialog
        open={open}
        handler={handleOpen}
        size="md"
        className="bg-white rounded-xl shadow-2xl max-w-[95vw] mx-auto overflow-hidden sm:max-w-lg md:max-w-xl"
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header Section */}
          <DialogHeader className="justify-between items-center bg-gradient-to-br from-yellow-400 to-green-500 rounded-t-xl px-4 py-3 md:px-6 md:py-4">
            <Typography
              variant="h4"
              className="text-black font-extrabold text-lg md:text-xl"
            >
              🎤 New Artist Event
            </Typography>
          </DialogHeader>

          {/* Body Section (Scrollable) */}
          <DialogBody className="space-y-4 px-4 py-3 md:px-6 md:py-4 overflow-y-auto flex-1 max-h-[60vh] sm:max-h-[70vh]">
            <Input
              variant="standard"
              name="title"
              label="Event Title"
              required
              color="green"
              icon={<CalendarDaysIcon className="h-5 w-5 text-green-700" />}
            />

            <Input
              name="datetime"
              label="Date & Time"
              type="datetime-local"
              required
              color="green"
              icon={<ClockIcon className="h-5 w-5 text-green-700" />}
            />

            <Input
              variant="standard"
              name="duration"
              label="Duration (HH:MM:SS)"
              placeholder="HH:MM:SS"
              color="green"
              value={duration}
              onChange={handleDurationChange}
            />

            <Input
              variant="standard"
              name="location"
              label="Location (URL or Online)"
              placeholder="e.g. https://maps.google.com/... or 'Online'"
              color="green"
            />

            <Textarea
              name="description"
              label="Description"
              required
              color="green"
              rows={4}
              className="resize-none"
            />

            <div className="space-y-1">
              <Typography className="text-sm text-gray-700 font-medium">
                Image (optional)
              </Typography>
              <Input
                name="image"
                type="file"
                accept="image/*"
                color="green"
                icon={<PhotoIcon className="h-5 w-5 text-green-700" />}
                className="file:bg-gradient-to-br from-yellow-400 to-green-50 file:text-green-700 file:rounded-lg"
              />
            </div>

            <Input
              variant="standard"
              name="link"
              label="External URL (Spotify, YouTube etc.)"
              type="text"
              color="green"
              icon={<LinkIcon className="h-5 w-5 text-green-700" />}
            />

            <div className="space-y-1">
              <Typography className="text-sm text-gray-700 font-medium">
                Category
              </Typography>
              <Select
                name="category"
                color="green"
                required
                label="Select a category"
              >
                <Option value="event">Event</Option>
                <Option value="drop">Drop</Option>
                <Option value="merch">Merchandise</Option>
                <Option value="tour">Tour</Option>
                <Option value="video">Video</Option>
                <Option value="reminder">Reminder</Option>
              </Select>
            </div>

            <div className="space-y-1">
              <Typography className="text-sm text-gray-700 font-medium">
                Attachment (optional)
              </Typography>
              <Input
                name="attachment"
                type="file"
                color="green"
                icon={<PaperClipIcon className="h-5 w-5 text-green-700" />}
                className="file:bg-gradient-to-br from-yellow-400 to-green-50 file:text-green-700 file:rounded-lg"
              />
            </div>
          </DialogBody>

          {/* Footer Section */}
          <DialogFooter className="flex justify-end gap-3 p-3 md:gap-4 md:p-4 border-t sticky bottom-0 bg-white">
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="hover:underline px-3 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="green"
              className="font-bold bg-gradient-to-br from-yellow-400 to-green-500 px-4 py-2 mb-2 mr-2"
            >
              Create Event
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
