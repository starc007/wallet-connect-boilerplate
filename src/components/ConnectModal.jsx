import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import metamask from "../assets/metamask.svg";
import walletconnect from "../assets/walletConnect.svg";

import { useAuth } from "../context/auth";

const ConnectModal = ({ isOpen, setIsOpen }) => {
  const { connect } = useAuth();

  const connectWallet = async (provider) => {
    await connect(provider);
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-x-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-gray-900"
                >
                  Connect via
                </Dialog.Title>
                <div className="flex flex-row border-b py-8 justify-around">
                  <div className="flex items-center">
                    <button
                      onClick={() => connectWallet("metamask")}
                      className="flex flex-col items-center md:text-xl text-lg text-gray-600"
                    >
                      <div className="bg-gray-200 rounded-full h-20 w-20 flex items-center justify-center mb-1">
                        <img
                          src={metamask}
                          alt="metamask"
                          className="h-16 w-16 p-2"
                        />
                      </div>
                      <span className="font-medium">Metamask</span>
                    </button>
                  </div>
                  <div className="flex items-center ">
                    <button
                      onClick={() => connectWallet("walletconnect")}
                      className="flex flex-col items-center md:text-xl text-lg text-gray-600"
                    >
                      <div className="bg-gray-200 rounded-full h-20 w-20 flex items-center justify-center mb-1">
                        <img
                          src={walletconnect}
                          alt="metamask"
                          className="h-16 w-16  p-2"
                        />
                      </div>
                      <span className="font-medium">Wallet Connect</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConnectModal;
