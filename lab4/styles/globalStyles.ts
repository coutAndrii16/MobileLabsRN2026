import { StyleSheet, Platform } from 'react-native';
import { COLORS } from './colors';

const ACCENT = '#7C83FD';
const BG = '#0F1117';
const CARD = '#1A1D27';
const BORDER = '#2A2D3E';
const TEXT = '#E8E8F0';
const SUBTEXT = '#8888AA';
export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.BG },

    header: {
        backgroundColor: COLORS.CARD,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER,
    },

    headerTitle: {
        color: COLORS.TEXT,
        fontSize: 20,
        fontWeight: '700',
    },

    // Stats
    statsContainer: {
        margin: 12,
        backgroundColor: CARD,
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: BORDER,
    },
    statsHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    statsTitle: { color: TEXT, fontSize: 13, fontWeight: '600' },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    statsLabel: { color: SUBTEXT, fontSize: 12 },
    statsValue: { color: TEXT, fontSize: 12, fontWeight: '600' },
    barBg: { height: 6, backgroundColor: BORDER, borderRadius: 3, marginTop: 8 },
    barFill: { height: 6, backgroundColor: ACCENT, borderRadius: 3 },

    // Path bar
    pathBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: CARD,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
    },
    backBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 8, paddingRight: 8, borderRightWidth: 1, borderRightColor: BORDER },
    backText: { color: ACCENT, fontSize: 13, fontWeight: '600' },
    pathText: { color: SUBTEXT, fontSize: 12, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },

    // Action bar
    actionBar: { flexDirection: 'row', padding: 10, gap: 8 },
    createBtn: {
        flex: 1, backgroundColor: CARD, borderRadius: 8, paddingVertical: 10,
        alignItems: 'center', borderWidth: 1, borderColor: BORDER,
    },
    createFileBtnAccent: { borderColor: ACCENT },
    createBtnText: { color: TEXT, fontSize: 13, fontWeight: '600' },

    // Items
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: CARD,
        marginHorizontal: 12,
        marginVertical: 4,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BORDER,
    },
    itemName: { flex: 1, color: TEXT, fontSize: 14, marginLeft: 10 },
    itemActions: { flexDirection: 'row', gap: 6 },
    actionBtn: { padding: 4 },

    // Empty
    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyIcon: { fontSize: 48, marginBottom: 12 },
    emptyText: { color: SUBTEXT, fontSize: 15 },

    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
    modalBox: {
        backgroundColor: CARD,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '80%',
        borderTopWidth: 1,
        borderColor: BORDER,
    },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    modalTitle: { color: TEXT, fontSize: 16, fontWeight: '700' },
    closeBtn: { backgroundColor: BORDER, borderRadius: 20, width: 28, height: 28, justifyContent: 'center', alignItems: 'center' },

    // Inputs
    input: {
        backgroundColor: BG,
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 8,
        color: TEXT,
        padding: 12,
        fontSize: 14,
        marginBottom: 10,
    },
    textarea: { height: 80, textAlignVertical: 'top' },
    editArea: { height: 200, textAlignVertical: 'top' },

    // Buttons
    primaryBtn: {
        backgroundColor: ACCENT,
        borderRadius: 10,
        paddingVertical: 13,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 4,
    },
    primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },

    // File content view
    fileContent: { backgroundColor: BG, borderRadius: 8, padding: 12, maxHeight: 300, marginBottom: 12 },
    fileContentText: { color: TEXT, fontSize: 13, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', lineHeight: 20 },

    // Info modal
    infoTable: { backgroundColor: BG, borderRadius: 10, overflow: 'hidden', marginBottom: 12 },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
    },
    infoLabel: { color: SUBTEXT, fontSize: 13 },
    infoValue: { color: TEXT, fontSize: 13, fontWeight: '600', maxWidth: '60%', textAlign: 'right' },
});