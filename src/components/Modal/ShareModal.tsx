import { useState } from "react";
import Modal from "./Modal";
import type { MyFile } from "../Tabs/Drive";

export default function ShareModal({
  file,
  onClose,
  onShare,
}: {
  file: MyFile;
  onClose: () => void;
  onShare: (isPublic: boolean, allowedEmails: string[]) => void;
}) {
  const [isPublic, setIsPublic] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");

  const handleAddEmail = () => {
    if (emailInput && !emails.includes(emailInput)) {
      setEmails([...emails, emailInput]);
      setEmailInput("");
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShare(isPublic, emails);
  };

  return (
    <Modal onClose={onClose} className="flex items-center justify-center">
      <div className="bg-neutral-950/50 backdrop-blur-md ring-2 ring-neutral-800 rounded-lg p-6 max-w-md min-w-sm">
        <h2 className="text-xl font-bold mb-4">Share {file.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="mr-2"
              />
              <span>Share with anyone (public)</span>
            </label>
          </div>
          {!isPublic && (
            <div className="mb-4">
              <label className="block mb-2">
                Share with specific people (by email)
              </label>
              <div className="flex">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-neutral-800 border border-neutral-700 rounded-l-md p-2 flex-grow"
                  placeholder="Enter email address"
                />
                <button
                  type="button"
                  onClick={handleAddEmail}
                  className="bg-blue-600 text-white px-4 rounded-r-md"
                >
                  Add
                </button>
              </div>
              <div className="mt-2">
                {emails.map((email) => (
                  <div
                    key={email}
                    className="flex items-center justify-between bg-neutral-800 rounded-md p-2 mt-2"
                  >
                    <span>{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(email)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="text-neutral-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
