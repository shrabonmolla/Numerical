import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  FaTelegram,
  FaBell,
  FaFacebook,
  FaLink,
  FaChevronDown,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaBookOpen,
  FaUsers,
  FaLayerGroup,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  DATA — Year -> Semester -> Batch. Ordering rules:                  */
/*  latest year first, latest semester first, current batch before     */
/*  older batches. Add new entries here — UI renders via .map().       */
/* ------------------------------------------------------------------ */

const academicMaterials = [
  {
    year: "2nd Year",
    semesters: [
      {
        semester: "Semester 1",
        batches: [
          {
            batch: "19 Batch",
            description:
              "Lecture sheets, notes & resources for 2nd Year, Semester 1.",
            link: "https://drive.google.com/drive/folders/1Z0koye8zkH8jssjacH1yZKuQYYuGRcy2?usp=drive_link",
          },
          {
            batch: "18 Batch",
            description:
              "Lecture sheets, notes & resources for 2nd Year, Semester 1.",
            link: "https://drive.google.com/drive/folders/1Xc3clTFKykcduz1Cxtm2Pc-3iKeBsweo?fbclid=IwY2xjawOOKCtleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAEwAAEehWASG7FuAKlBwq3DHqgdhQENXadf0wmCeHpp-iGAsB37766pLB_udfXxeyo_aem_g1tTF01LOazxuOTdPNIhgg",
          },
        ],
      },
    ],
  },
  {
    year: "1st Year",
    semesters: [
      {
        semester: "Semester 2",
        batches: [
          {
            batch: "19 Batch",
            description:
              "Lecture sheets, notes & resources for 1st Year, Semester 2.",
            link: "https://docs.google.com/spreadsheets/u/4/d/e/2PACX-1vQy-dMjg6ED8Vyc4PeFsglZe-13N98-m3VZgSZTPlQG7CHgXp8UGvV1LBxGoH2NTJq6XrLtefhmfMSf/pubhtml#",
          },
          {
            batch: "18 Batch",
            description:
              "Lecture sheets, notes & resources for 1st Year, Semester 2.",
            link: "https://drive.google.com/drive/folders/1UO2cjPZWm_htiB9tKTPMNY9gZEhj-eGa",
          },
        ],
      },
      {
        semester: "Semester 1",
        batches: [
          {
            batch: "19 Batch",
            description:
              "Lecture sheets, notes & resources for 1st Year, Semester 1.",
            link: "https://drive.google.com/drive/u/0/folders/1-6fQ82d5EX3Qtni3eKrMHcx7TOeeOqSQ",
          },
          {
            batch: "18 Batch",
            description:
              "Lecture sheets, notes & resources for 1st Year, Semester 1.",
            link: "https://drive.google.com/drive/folders/1EwcNc8g5wXDDiqPjoTKGG0bbRqO3BEtX",
          },
        ],
      },
    ],
  },
];

const communityLinks = [
  {
    name: "Telegram Group",
    description: "Classnote sharing & discussion",
    link: "https://t.me/+JBX8LkloPr8zNTM1",
    icon: FaTelegram,
  },
  {
    name: "Notice Group",
    description: "Official notices & updates",
    link: "https://www.messenger.com/t/8457632377695721",
    icon: FaBell,
  },
  {
    name: "Facebook Group",
    description: "Community discussions",
    link: "https://www.facebook.com/profile.php?id=61572255675948",
    icon: FaFacebook,
  },
];

const essentialLinks = [
  {
    name: "Department Website",
    description: "JnU Department of Mathematics",
    link: "https://jnu.ac.bd/department/portal/mathematics",
  },
  {
    name: "Student ERP",
    description: "Student login portal",
    link: "https://student.erp.jnu.ac.bd/",
  },
  {
    name: "BSc Mathematics Syllabus",
    description: "Full curriculum document",
    link: "https://drive.google.com/file/d/1KpQYXFHbo195eMg68LM1bJ1WhP4iJPYt/view?usp=sharing",
  },
  {
    name: "Eccentric-18 Website",
    description: "Batch community website",
    link: "https://eccentric18.netlify.app/",
  },
];

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                  */
/* ------------------------------------------------------------------ */

const pageVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const sectionVariant = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

/* ------------------------------------------------------------------ */
/*  SEMESTER ROW — clickable row inside an accordion panel             */
/* ------------------------------------------------------------------ */

function SemesterRow({ semester, batch, description, link }) {
  return (
    <motion.a
      variants={cardVariant}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-100
        bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200
        hover:bg-blue-50/40 hover:shadow-lg sm:p-5"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <FaBookOpen className="text-base" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
              {semester}
            </h4>
            <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              {batch}
            </span>
          </div>
          {description && (
            <p className="mt-0.5 truncate text-xs text-gray-500 sm:text-sm">
              {description}
            </p>
          )}
        </div>
      </div>

      <FaExternalLinkAlt className="shrink-0 text-xs text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-500" />
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  ACCORDION PANEL — one per academic year                            */
/*  forceOpen: when searching, panels with matches stay expanded       */
/*  regardless of the single-open state.                               */
/* ------------------------------------------------------------------ */

function YearAccordion({ yearGroup, isOpen, onToggle, forceOpen }) {
  const resourceCount = yearGroup.semesters.reduce(
    (acc, s) => acc + s.batches.length,
    0,
  );

  const expanded = forceOpen || isOpen;

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Panel header / toggle */}
      <button
        type="button"
        onClick={onToggle}
        disabled={forceOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6 disabled:cursor-default"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
            <FaGraduationCap className="text-sm" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
              {yearGroup.year}
            </h3>
            <p className="text-xs text-gray-400 sm:text-sm">
              {resourceCount} {resourceCount === 1 ? "resource" : "resources"}
            </p>
          </div>
        </div>

        {!forceOpen && (
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400"
          >
            <FaChevronDown className="text-xs" />
          </motion.span>
        )}
      </button>

      {/* Panel content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="space-y-6 border-t border-gray-100 px-5 py-6 sm:px-6"
            >
              {yearGroup.semesters.map((sem) => (
                <div key={`${yearGroup.year}-${sem.semester}`}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {sem.semester}
                  </p>
                  <div className="space-y-3">
                    {sem.batches.map((b) => (
                      <SemesterRow
                        key={`${yearGroup.year}-${sem.semester}-${b.batch}`}
                        semester={sem.semester}
                        batch={b.batch}
                        description={b.description}
                        link={b.link}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  COMPACT CARD — shared by Community & Essential Links               */
/* ------------------------------------------------------------------ */

const accentStyles = {
  emerald: {
    iconBg: "bg-emerald-50 text-emerald-600",
    hoverBorder: "hover:border-emerald-200",
    hoverBg: "hover:bg-emerald-50/40",
    arrow: "group-hover:text-emerald-500",
  },
  purple: {
    iconBg: "bg-purple-50 text-purple-600",
    hoverBorder: "hover:border-purple-200",
    hoverBg: "hover:bg-purple-50/40",
    arrow: "group-hover:text-purple-500",
  },
};

function CompactCard({ name, description, link, Icon, accent }) {
  const styles = accentStyles[accent];

  return (
    <motion.a
      variants={cardVariant}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-5
        shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
        ${styles.hoverBorder} ${styles.hoverBg}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.iconBg}`}
        >
          <Icon className="text-base" />
        </div>
        <FaExternalLinkAlt
          className={`text-xs text-gray-300 transition-all duration-300 group-hover:translate-x-1 ${styles.arrow}`}
        />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
          {name}
        </h4>
        {description && (
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">{description}</p>
        )}
      </div>
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION HEADER — shared title style for secondary sections         */
/* ------------------------------------------------------------------ */

function SectionHeader({ icon: Icon, title, subtitle, accentClass, count }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentClass}`}
        >
          <Icon className="text-sm" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-gray-500 sm:text-sm">{subtitle}</p>
          )}
        </div>
      </div>
      {typeof count === "number" && (
        <span className="text-xs font-medium text-gray-400">
          {count} {count === 1 ? "result" : "results"}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                      */
/* ------------------------------------------------------------------ */

function Resource() {
  const [query, setQuery] = useState("");
  // Only one accordion panel open at a time (when not searching) —
  // default to the latest year (index 0).
  const [openYear, setOpenYear] = useState(academicMaterials[0]?.year ?? null);

  const toggleYear = (year) => {
    setOpenYear((prev) => (prev === year ? null : year));
  };

  const isSearching = query.trim().length > 0;

  // Filter academic materials by year / semester / batch against the search query.
  // Matching is done at the batch level, then semesters/years with zero
  // matching batches are dropped entirely.
  const filteredAcademic = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return academicMaterials;

    return academicMaterials
      .map((yearGroup) => {
        const semesters = yearGroup.semesters
          .map((sem) => {
            const batches = sem.batches.filter((b) =>
              `${yearGroup.year} ${sem.semester} ${b.batch} ${b.description}`
                .toLowerCase()
                .includes(q),
            );
            return { ...sem, batches };
          })
          .filter((sem) => sem.batches.length > 0);
        return { ...yearGroup, semesters };
      })
      .filter((yearGroup) => yearGroup.semesters.length > 0);
  }, [query]);

  const resultCount = useMemo(
    () =>
      filteredAcademic.reduce(
        (yearAcc, y) =>
          yearAcc +
          y.semesters.reduce((semAcc, s) => semAcc + s.batches.length, 0),
        0,
      ),
    [filteredAcademic],
  );

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={pageVariant}
      className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8"
    >
      {/* ---------------------------------------------------------- */}
      {/* HERO SECTION                                                */}
      {/* ---------------------------------------------------------- */}
      <motion.header variants={sectionVariant} className="mb-14 text-center">
        <h1 className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          📚 Academic Resource Hub
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 sm:text-base">
          Access lecture sheets, previous batches, important links, and student
          communities from one place.
        </p>

        {/* Search bar — filters Academic Materials by year, semester, batch */}
        <div className="mx-auto mt-8 max-w-md">
          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus-within:border-blue-300 focus-within:shadow-md">
            <FaSearch className="shrink-0 text-sm text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by year, semester or batch..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
            {isSearching && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="shrink-0 text-gray-300 transition-colors hover:text-gray-500"
              >
                <FaTimes className="text-sm" />
              </button>
            )}
          </div>
        </div>
      </motion.header>

      {/* ---------------------------------------------------------- */}
      {/* SECTION 1 — ACADEMIC MATERIALS (primary, accordion layout)  */}
      {/* ---------------------------------------------------------- */}
      <motion.section variants={sectionVariant} className="mb-16">
        <SectionHeader
          icon={FaLayerGroup}
          title="Academic Materials"
          subtitle={
            isSearching
              ? `Showing matches for "${query.trim()}"`
              : "Organized by year — tap a year to expand"
          }
          accentClass="bg-blue-50 text-blue-600"
          count={isSearching ? resultCount : undefined}
        />

        {isSearching && filteredAcademic.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 py-12 text-center">
            <p className="text-sm text-gray-400">
              No resources found for "{query.trim()}".
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-3 text-sm font-medium text-blue-600 hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAcademic.map((yearGroup) => (
              <YearAccordion
                key={yearGroup.year}
                yearGroup={yearGroup}
                isOpen={openYear === yearGroup.year}
                onToggle={() => toggleYear(yearGroup.year)}
                forceOpen={isSearching}
              />
            ))}
          </div>
        )}
      </motion.section>

      {/* ---------------------------------------------------------- */}
      {/* SECTION 2 — COMMUNITY (secondary section)                   */}
      {/* ---------------------------------------------------------- */}
      <motion.section variants={sectionVariant} className="mb-16">
        <SectionHeader
          icon={FaUsers}
          title="Community"
          subtitle="Stay connected with fellow students"
          accentClass="bg-emerald-50 text-emerald-600"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {communityLinks.map((item) => (
            <CompactCard
              key={item.name}
              name={item.name}
              description={item.description}
              link={item.link}
              Icon={item.icon}
              accent="emerald"
            />
          ))}
        </motion.div>
      </motion.section>

      {/* ---------------------------------------------------------- */}
      {/* SECTION 3 — ESSENTIAL LINKS (secondary section)              */}
      {/* ---------------------------------------------------------- */}
      <motion.section variants={sectionVariant}>
        <SectionHeader
          icon={FaLink}
          title="Essential Links"
          subtitle="Quick access to important portals"
          accentClass="bg-purple-50 text-purple-600"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {essentialLinks.map((item) => (
            <CompactCard
              key={item.name}
              name={item.name}
              description={item.description}
              link={item.link}
              Icon={FaLink}
              accent="purple"
            />
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}

export default Resource;
