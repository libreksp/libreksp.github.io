# Current Projects:

## [Contribute!](https://codeberg.org/libreksp)

---

## Kunix: A Monolithic Unix-like Kernel and Userland

“Kunix, Codename: Kodiak” is the current version of the Kunix kernel and userland.

Kunix is designed to be a **“nucleus”** of Unix systems, with compatibility layers for **most Unix-based systems**, and to be **(near) fully POSIX-compliant.** This is **very** ambitious, but I do believe that over enough time we could be at least mostly Linux and/or BSD-compatible.

At a later date, we will transition to “Kunix, Codename: Fairbanks,” which will be a semi-microkernel (more info at a later date).

Right now, Kunix is made by *one* developer, so timelines are rough and development is irregular in pace.

*We haven’t decided on a license yet, which is why Kunix remains closed (for a little while).*

---

### Kunix Status / Roadmap

This is a **very rough estimate.**

Booting with GNU GRUB ✓  
Interrupt Descriptor Table ✓  
Formatted Printing ✓  
Serial Driver ✓  
RTC and PIC ✓  
Keyboard Handling ✓  
Scheduling ✓  

**conch** shell — *(IN PROGRESS – Expected December 2025)*  
UFS filesystem support — *(IN PROGRESS – Expected February 2026)*  
Ethernet driver — *(IN PROGRESS – Expected February 2026)*  
Framebuffer and exiting VGA text mode — *(Expected April 2026)*  
Syscalls and Ring 3 — *(Expected June 2026 or later)*  
KFS (Kunix Filesystem) — *(2026–2027)*  
The rest… *(???)*

---

## Denali Linux

A Linux From Scratch distribution for the Klondike Software Project.

Denali will use the KDE desktop environment, customized for beauty and simplicity.

It will initially use OpenRC, Zsh and pkgtools.

---

### Planned Features (very early)

Habilis init system  
Arf package manager  
Conch for Linux  

---

## The Klondike License Family

Explained here:  
[Here](/licenses/licenses.html)

---

## Planned Projects

### Will be done
kBoot (bootloader)  
klibc (C library)  

### Hopeful
Klamath Desktop Environment for Kunix  
Prime Meridian (Linux compatibility layer for Kunix)  
Inferno (BSD compatibility layer for Kunix)  

### Maybe someday
Juneau (firmware)