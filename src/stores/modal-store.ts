import { create } from "zustand";

type Modal<T = unknown> = { key: string; data: T };

type ModalStore = {
	modal: Modal | null;
	open: <T>(props: Modal<T>) => void;
	close: () => void;
	isOpen: (key: string) => boolean;
	useModal: <U = unknown>(
		key: string,
	) => { modal: Modal<U> | null; isOpen: boolean; close: () => void };
};

export const useModalStore = create<ModalStore>((set, get) => ({
	modal: null,
	open: (props) => set({ modal: props }),
	close: () => set({ modal: null }),
	isOpen: (key) => get().modal?.key === key,
	useModal: (key) => {
		const modal = get().modal?.key === key ? (get().modal as Modal<any>) : null;
		return { modal, isOpen: !!modal, close: get().close };
	},
}));
