"""Clustering-formula animation for the VC Brain market map.

Two dense slates, < 10s total, neo-brutalist: white canvas, black ink,
2px frames with hard offset shadows, DM Sans captions, red/yellow accents.

Render (manim CE >= 0.19, LaTeX + ffmpeg required):
  manim -qh cluster_formula.py ClusterFormula -o cluster-formula.mp4
"""

from pathlib import Path

import manimpango
from manim import *

INK = "#000000"
CHARCOAL = "#333333"
RED = "#ff3333"
YELLOW = "#ffff00"

config.background_color = WHITE
# Brand sans, bundled so renders don't depend on system-installed fonts.
# Static weights, not the variable TTF — manimpango mis-spaces variable fonts.
for _f in ("DMSans-Regular.ttf", "DMSans-Bold.ttf"):
    manimpango.register_font(str(Path(__file__).parent / "fonts" / _f))
SANS = "DM Sans"


def eyebrow(step: str, title: str) -> VGroup:
    tag = Text(step, font=SANS, weight=BOLD, color=WHITE, font_size=15)
    box = SurroundingRectangle(tag, buff=0.09, color=INK, fill_color=INK, fill_opacity=1, stroke_width=2)
    label = Text(title, font=SANS, weight=BOLD, color=CHARCOAL, font_size=15)
    g = VGroup(VGroup(box, tag), label).arrange(RIGHT, buff=0.25)
    g.to_corner(UL, buff=0.5)
    return g


def wordmark() -> Text:
    return Text("VC BRAIN · MARKET CLUSTERING", font=SANS, weight=BOLD,
                color=CHARCOAL, font_size=13).to_corner(UR, buff=0.55)


def brutal_frame(mobj: Mobject, shadow_color=INK) -> VGroup:
    box = SurroundingRectangle(mobj, buff=0.26, color=INK, stroke_width=3, fill_color=WHITE, fill_opacity=1)
    shadow = box.copy().set_stroke(width=0).set_fill(shadow_color, 1).shift(0.085 * DOWN + 0.085 * RIGHT)
    return VGroup(shadow, box)


class ClusterFormula(Scene):
    def construct(self):
        Text.set_default(color=INK)
        MathTex.set_default(color=INK)

        # ---------- slate 1: similarity ----------
        eb = eyebrow(" 01 ", "PAIRWISE SIMILARITY")
        wm = wordmark()

        sim = MathTex(r"S(a,b)", r"=", r"\sum_{d=1}^{10}", r"\hat{w}_d", r"\,s_d(a,b)", font_size=54)
        sim.move_to(1.95 * UP)
        frame = brutal_frame(sim, shadow_color=YELLOW)

        weights = MathTex(
            r"\hat{w} = \big(",
            r"\underset{\text{industry}}{0.18}", r",\ \underset{\text{problem}}{0.15}",
            r",\ \underset{\text{customer}}{0.12}", r",\ \underset{\text{product}}{0.10}",
            r",\ \underset{\text{technical}}{0.10}", r",\ \underset{\text{model}}{0.08}",
            r",\ \underset{\text{gtm}}{0.08}", r",\ \underset{\text{founder}}{0.07}",
            r",\ \underset{\text{disruption}}{0.07}", r",\ \underset{\text{regulatory}}{0.05}",
            r"\big)",
            font_size=26,
        ).next_to(frame, DOWN, buff=0.42)
        weights.set_color(CHARCOAL)
        weights[1].set_color(RED)

        m1 = MathTex(r"s_{\text{labels}}", r"=\tfrac{|A\cap B|}{|A\cup B|}", font_size=38)
        m2 = MathTex(r"s_{\text{path}}", r"=\tfrac{\ell_{\text{shared prefix}}}{\max(|P_a|,|P_b|)}", font_size=38)
        m3 = MathTex(r"s_{\text{problem}}", r"=\cos(e_a,e_b)", font_size=38)
        m4 = MathTex(r"s_{\text{cat}}=\begin{cases}1 & a=b\\ \min(0.8,\,J_{\text{words}}) & a\neq b\end{cases}",
                     font_size=34)
        for head in (m1[0], m2[0], m3[0]):
            head.set_color(RED)
        m4[0][0:4].set_color(RED)
        n1 = Text("customers · technical · founder · disruption · regulatory", font=SANS, color=CHARCOAL, font_size=12)
        n2 = Text("industry · product taxonomy paths", font=SANS, color=CHARCOAL, font_size=12)
        n3 = Text("problem-statement embeddings", font=SANS, color=CHARCOAL, font_size=12)
        n4 = Text("business model · go-to-market", font=SANS, color=CHARCOAL, font_size=12)
        grid = VGroup(
            VGroup(m1, n1).arrange(DOWN, buff=0.12, aligned_edge=LEFT),
            VGroup(m2, n2).arrange(DOWN, buff=0.12, aligned_edge=LEFT),
            VGroup(m3, n3).arrange(DOWN, buff=0.12, aligned_edge=LEFT),
            VGroup(m4, n4).arrange(DOWN, buff=0.12, aligned_edge=LEFT),
        ).arrange_in_grid(rows=2, cols=2, buff=(1.0, 0.5), cell_alignment=LEFT)
        grid.scale_to_fit_width(min(grid.width, 12.6)).to_edge(DOWN, buff=0.55)

        self.play(FadeIn(eb), FadeIn(wm), run_time=0.35)
        self.play(FadeIn(frame), Write(sim), run_time=0.8)
        self.play(FadeIn(weights, shift=0.15 * UP), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(g, shift=0.2 * UP) for g in grid], lag_ratio=0.12), run_time=0.7)
        self.wait(1.9)
        self.play(FadeOut(VGroup(frame, sim, weights, grid)), run_time=0.35)

        # ---------- slate 2: agglomeration ----------
        eb2 = eyebrow(" 02 ", "AGGLOMERATION + K-MEDOID SPLIT")
        self.play(ReplacementTransform(eb, eb2), run_time=0.3)

        link = MathTex(
            r"\mathcal{L}(A,B)", r"=", r"\frac{1}{|A||B|}\sum_{i\in A}\sum_{j\in B}", r"S(i,j)",
            font_size=48,
        ).move_to(1.85 * UP)
        link[3].set_color(RED)
        lframe = brutal_frame(link, shadow_color=YELLOW)

        rule = MathTex(
            r"\text{merge } \underset{A,B}{\operatorname{arg\,max}}\ \mathcal{L}",
            r"\ \ \text{while}\ \ ",
            r"\mathcal{L}^{*}\ge\tau_{0.45}",
            r"\ \text{ or }\ ",
            r"|\mathcal{C}|>K_{8}",
            font_size=42,
        ).next_to(lframe, DOWN, buff=0.5)
        rule[2].set_color(RED)
        rule[4].set_color(RED)

        medoid = MathTex(
            r"m(C)=\underset{i\in C}{\operatorname{arg\,max}}\ \tfrac{1}{|C|-1}\!\!\sum_{j\in C\setminus\{i\}}\!\! S(i,j)",
            r"\qquad",
            r"|C|>s_{\max}\Rightarrow k\text{-medoids},\ k=\lceil |C|/s_{\max}\rceil",
            font_size=32,
        ).next_to(rule, DOWN, buff=0.55)
        medoid[2].set_color(CHARCOAL)
        foot = Text("average linkage · deterministic ties · farthest-first seeded Lloyd refinement",
                    font=SANS, color=CHARCOAL, font_size=13).to_edge(DOWN, buff=0.45)

        self.play(FadeIn(lframe), Write(link), run_time=0.7)
        self.play(FadeIn(rule, shift=0.15 * UP), run_time=0.45)
        self.play(FadeIn(medoid, shift=0.15 * UP), FadeIn(foot), run_time=0.45)
        self.wait(2.2)
