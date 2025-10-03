import { create } from "zustand";

type Modal<T = unknown> = {
	key: string;
	data: T;
};

type ModalStore = {
	modal: Modal | null;
	open: <T>(props: Modal<T>) => void;
	close: () => void;
	isOpen: (key: string) => boolean;
	getModalData: <T = unknown>(key: string) => T | null;
};

export const useModalStore = create<ModalStore>((set, get) => ({
	modal: null,
	open: (props) => set({ modal: props }),
	close: () => set({ modal: null }),
	isOpen: (key) => get().modal?.key === key,
	getModalData: <T,>(key: string): T | null => {
		const { modal } = get();
		return modal?.key === key ? (modal.data as T) : null;
	},
}));

export const useModal = <T = unknown>(key: string) => {
	const isModalOpen = useModalStore((state) => state.isOpen(key));
	const modalData = useModalStore((state) => 
		state.modal?.key === key ? (state.modal.data as T) : null
	);
	const close = useModalStore((state) => state.close);
	return { isOpen: isModalOpen, data: modalData, close } as const;
};

export const createModalKey = <T,>(key: string) => ({
	key,
	open: (data: T) => useModalStore.getState().open({ key, data }),
	useModal: () => useModal<T>(key),
});