import {
  User,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  Link,
  Globe,
} from "lucide-react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
    },
    { key: "linkedin", label: "LinkedIn Profile", icon: Link, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800">
        Personal Informations
      </h3>
      <p className="text-gray-600 text-sm">
        Get started with the personal informations
      </p>
      <div className="flex items-center gap-2">
        <label>
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user-image"
              className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            <div className="flex flex-row mt-2 items-center gap-2 text-sm text-gray-600">
              <User className="size-10 p-2.5 border rounded-full" />
              upload user image
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>
        {typeof data.image === "object" && (
          <div className="flex flex-col gap-2 pl-4 text-sm">
            <p>Remove Background</p>
            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
              <input
                className="sr-only peer"
                type="checkbox"
                checked={removeBackground}
                onChange={() => setRemoveBackground((prev) => !prev)}
              />
              <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-500 transition-colors duration-200"></div>
              <spam className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></spam>
            </label>
          </div>
        )}
      </div>

      {fields.map((field) => {
        const Icon = field.icon;

        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Icon className="size-4" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder={`Enter your ${field.label}`}
              required={field.required}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;
