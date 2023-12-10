import { inviteValidate } from "./actions";

export default async function Page({ params }: { params: { id: string } }) {
  const guestInvite = await inviteValidate(params);

  return (
    <div className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
      <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
        {guestInvite.map((guest) => (
          <li key={guest.id}>
            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="checkbox-item-11"
                type="checkbox"
                value={+guest.confirmed}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="checkbox-item-11"
                className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                {guest.first_name} {guest.last_name}
              </label>
            </div>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="flex items-center p-3 text-sm font-medium text-green-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-green-500 hover:underline"
      >
        Save Invite
      </a>
    </div>
  );
}
